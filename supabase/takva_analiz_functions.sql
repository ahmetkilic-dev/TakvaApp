-- Drop previous incompatible function
drop function if exists public.recalculate_takva_analiz(uuid);
drop function if exists public.recalculate_takva_analiz(text);

-- Function to recalculate and populate Takva Analiz table
-- Now accepts p_user_id as TEXT to match legacy system
create or replace function public.recalculate_takva_analiz(p_user_id text)
returns void
language plpgsql
security definer
as $$
declare
  v_daily jsonb;
  v_weekly jsonb;
  v_monthly jsonb;
  v_yearly jsonb;
  v_today date := current_date;
begin
  -- No need to fetch text ID from auth, p_user_id is already text
  
  -- 1. DAILY (Today)
  select to_jsonb(t) into v_daily from (
    select 
      coalesce(sum(verses_read_today), 0) as ayet,
      coalesce(sum((select count(*) from jsonb_each_text(namaz_completed) where value = 'true')), 0) as namaz,
      coalesce(sum(dhikr_count), 0) as zikir,
      coalesce(sum(salavat_count_today), 0) as salavat,
      coalesce(sum(coalesce(question_count,0) - coalesce(wrong_answer_count,0)), 0) as ilim,
      (select count(*) from public.user_badges where user_id = p_user_id and completed_at::date = v_today) as gorev
    from public.daily_user_stats
    where user_id = p_user_id and date_key = v_today
  ) t;

  -- 2. WEEKLY (Last 7 Days)
  select to_jsonb(t) into v_weekly from (
    select 
      coalesce(sum(verses_read_today), 0) as ayet,
      coalesce(sum((select count(*) from jsonb_each_text(namaz_completed) where value = 'true')), 0) as namaz,
      coalesce(sum(dhikr_count), 0) as zikir,
      coalesce(sum(salavat_count_today), 0) as salavat,
      coalesce(sum(coalesce(question_count,0) - coalesce(wrong_answer_count,0)), 0) as ilim,
      (select count(*) from public.user_badges where user_id = p_user_id and completed_at >= (now() - interval '7 days')) as gorev
    from public.daily_user_stats
    where user_id = p_user_id and date_key >= (v_today - 7)
  ) t;

  -- 3. MONTHLY (Last 30 Days)
  select to_jsonb(t) into v_monthly from (
    select 
      coalesce(sum(verses_read_today), 0) as ayet,
      coalesce(sum((select count(*) from jsonb_each_text(namaz_completed) where value = 'true')), 0) as namaz,
      coalesce(sum(dhikr_count), 0) as zikir,
      coalesce(sum(salavat_count_today), 0) as salavat,
      coalesce(sum(coalesce(question_count,0) - coalesce(wrong_answer_count,0)), 0) as ilim,
      (select count(*) from public.user_badges where user_id = p_user_id and completed_at >= (now() - interval '30 days')) as gorev
    from public.daily_user_stats
    where user_id = p_user_id and date_key >= (v_today - 30)
  ) t;

  -- 4. YEARLY (Last 365 Days)
  select to_jsonb(t) into v_yearly from (
    select 
      coalesce(sum(verses_read_today), 0) as ayet,
      coalesce(sum((select count(*) from jsonb_each_text(namaz_completed) where value = 'true')), 0) as namaz,
      coalesce(sum(dhikr_count), 0) as zikir,
      coalesce(sum(salavat_count_today), 0) as salavat,
      coalesce(sum(coalesce(question_count,0) - coalesce(wrong_answer_count,0)), 0) as ilim,
      (select count(*) from public.user_badges where user_id = p_user_id and completed_at >= (now() - interval '365 days')) as gorev
    from public.daily_user_stats
    where user_id = p_user_id and date_key >= (v_today - 365)
  ) t;

  -- Default to empty stats if null (e.g. no records found)
  if v_daily is null then v_daily := '{"ayet": 0, "namaz": 0, "zikir": 0, "salavat": 0, "ilim": 0, "gorev": 0}'::jsonb; end if;
  if v_weekly is null then v_weekly := '{"ayet": 0, "namaz": 0, "zikir": 0, "salavat": 0, "ilim": 0, "gorev": 0}'::jsonb; end if;
  if v_monthly is null then v_monthly := '{"ayet": 0, "namaz": 0, "zikir": 0, "salavat": 0, "ilim": 0, "gorev": 0}'::jsonb; end if;
  if v_yearly is null then v_yearly := '{"ayet": 0, "namaz": 0, "zikir": 0, "salavat": 0, "ilim": 0, "gorev": 0}'::jsonb; end if;

  -- Update or Insert into table
  insert into public.takva_analiz (user_id, daily, weekly, monthly, yearly, updated_at)
  values (p_user_id, v_daily, v_weekly, v_monthly, v_yearly, now())
  on conflict (user_id) do update set
    daily = excluded.daily,
    weekly = excluded.weekly,
    monthly = excluded.monthly,
    yearly = excluded.yearly,
    updated_at = now();
end;
$$;
