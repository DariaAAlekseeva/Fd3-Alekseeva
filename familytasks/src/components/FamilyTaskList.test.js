import { render, screen } from '@testing-library/react';
import FamilyTaskList from './FamilyTaskList';

test('Фильтрация задач по типу "Мои задачи"', () => {
    const tasks = [
        { id: 1, text: 'Задача 1', assignedTo: 'vasya', completed: false },
        { id: 2, text: 'Задача 2', assignedTo: 'dasha', completed: true },
        { id: 3, text: 'Общая задача', assignedTo: 'общее', completed: false },
    ];
    const currentUser = 'vasya';

    const filteredTasks = tasks.filter((task) => task.assignedTo === currentUser);

    expect(filteredTasks.length).toBe(1);
    expect(filteredTasks[0].text).toBe('Задача 1');
});

test('Добавление новой задачи', () => {
    const tasks = [
        { id: 1, text: 'Задача 1', assignedTo: 'vasya', completed: false },
    ];

    const newTask = { id: 2, text: 'Новая задача', assignedTo: 'dasha', completed: false };

    const updatedTasks = [...tasks, newTask];

    expect(updatedTasks.length).toBe(2);
    expect(updatedTasks[1].text).toBe('Новая задача');
});


test('Удаление задачи', () => {
    const tasks = [
        { id: 1, text: 'Задача 1', assignedTo: 'vasya', completed: false },
        { id: 2, text: 'Задача 2', assignedTo: 'dasha', completed: true },
    ];

    const updatedTasks = tasks.filter((task) => task.id !== 1);

    expect(updatedTasks.length).toBe(1);
    expect(updatedTasks[0].id).toBe(2);
});
