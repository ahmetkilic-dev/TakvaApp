import React from 'react';
import { View, Text } from 'react-native';
import TaskCard from './TaskCard';

const fontFamily = 'Plus Jakarta Sans';

export const DailyTaskSection = ({ tasks, onTaskPress }) => {
    return (
        <View style={{ marginBottom: 40 }}>
            <Text
                style={{
                    fontFamily,
                    fontSize: 20,
                    fontWeight: '700',
                    color: '#FFFFFF',
                    marginBottom: 8,
                    textAlign: 'center',
                }}
            >
                Bugünün Görevleri
            </Text>
            <Text
                style={{
                    fontFamily,
                    fontSize: 10,
                    fontWeight: '400',
                    color: 'rgba(255, 255, 255, 0.6)',
                    marginBottom: 24,
                    lineHeight: 14,
                    textAlign: 'center',
                }}
            >
                Bugüne özel küçük görevleri tamamlayarak istikrarını artır.
            </Text>

            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    text={task.text}
                    progress={task.progress}
                    target={task.target}
                    onPress={() => onTaskPress(task.route)}
                />
            ))}
        </View>
    );
};

export default React.memo(DailyTaskSection);
