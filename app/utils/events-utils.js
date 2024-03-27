class EventsUtils {
    static convertToMinutes = (timeString) => {
        const time = new Date(timeString);
        return time.getHours() * 60 + time.getMinutes();
    };
    static calculateEventDuration = (event) => {
        const startTime = this.convertToMinutes(event.startTime);
        const endTime = this.convertToMinutes(event.endTime);
        return endTime - startTime; // duration in milliseconds
    };

    static async eventsDataWithDateTime(eventsData) {
        const eventsDataWithDateTime = eventsData.map(event => {
            const startTime = new Date(event.startTime);
            const date = startTime.toLocaleDateString();
            const [day, month, year] = date.split('.');

            // Create a new Date object with the provided day, month, and year
            const dateObject = new Date(`${year}-${month}-${day}`);

            // Format the date to "YYYY-MM-DD"
            const formattedDate = dateObject.toISOString().split('T')[0];

            return {
                ...event,
                date: formattedDate,
                time: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                name: event.title
            };
        });

        return eventsDataWithDateTime;
    }

    static groupEventsByDate(week) {

        return week.map(dayData => {
            if (!Array.isArray(dayData.data) || dayData.data.length === 0) {
                return dayData;
            }

            const singleDayEvents = dayData.data.filter(event => {
                const startDate = new Date(event.data.startTime).setHours(0, 0, 0, 0);
                const endDate = new Date(event.data.endTime).setHours(0, 0, 0, 0);
                return startDate === endDate; // Если даты начала и конца совпадают
            });

            // Фильтруем события, которые пересекают несколько дней

            const multiDayEventsWithCounts = dayData.data
                // Фильтруем многодневные события
                .filter(event => {
                    const startDate = new Date(event.data.startTime).setHours(0, 0, 0, 0);
                    const endDate = new Date(event.data.endTime).setHours(0, 0, 0, 0);
                    return startDate !== endDate; // Оставляем только многодневные события
                })
                // Считаем количество дубликатов для каждого многодневного события
                .reduce((acc, currentEvent) => {
                    // Находим существующий элемент в аккумуляторе
                    const existingEvent = acc.find(event => event.data.originalEventId === currentEvent.data.originalEventId);

                    if (existingEvent) {
                        // Если событие уже есть в аккумуляторе, увеличиваем счётчик
                        existingEvent.count++;
                    } else {
                        // Если событие встречается в первый раз, добавляем его с счётчиком 1
                        acc.push({
                            ...currentEvent,
                            count: currentEvent.data.isDuplicate ? 0 : 1 // Если текущее событие - дубликат, начинаем с 0
                        });
                    }
                    return acc;
                }, [])
                // Оставляем только оригинальные события (не дубликаты)
                .filter(event => !event.data.isDuplicate)
                // Корректируем свойство gridColumnEnd для каждого события
                .map(event => ({
                    ...event,
                    gridColumnEnd: event.count // gridColumnEnd равен количеству дубликатов
                }));

            const eventsWithPosition = this.calculateOverlaps(singleDayEvents);

            const updatedEvents = eventsWithPosition.map(event => {
                // Add additional properties to event object if needed
                return {
                    ...event,
                    // Use the calculated positions for left offset and width
                    leftOffset: event.leftOffset,
                    width: event.width,
                    // Your existing properties
                    topOffset: event.topOffset,
                    height: event.height,
                };
            });

            return {
                ...dayData,
                data: updatedEvents,
                multiDayEvents: multiDayEventsWithCounts
            };
        });
    }

    static groupEventsByDateForDay(day) {

        if (!Array.isArray(day.data) || day.data.length === 0) {
            return day;
        }

        const singleDayEvents = day.data.filter(event => {
            const startDate = new Date(event.data.startTime).setHours(0, 0, 0, 0);
            const endDate = new Date(event.data.endTime).setHours(0, 0, 0, 0);
            return startDate === endDate; // Если даты начала и конца совпадают
        });

        // Фильтруем события, которые пересекают несколько дней

        const multiDayEventsWithCounts = day.data
            // Фильтруем многодневные события
            .filter(event => {
                const startDate = new Date(event.data.startTime).setHours(0, 0, 0, 0);
                const endDate = new Date(event.data.endTime).setHours(0, 0, 0, 0);
                return startDate !== endDate; // Оставляем только многодневные события
            })
            // Считаем количество дубликатов для каждого многодневного события
            .reduce((acc, currentEvent) => {
                // Находим существующий элемент в аккумуляторе
                const existingEvent = acc.find(event => event.data.originalEventId === currentEvent.data.originalEventId);

                if (existingEvent) {
                    // Если событие уже есть в аккумуляторе, увеличиваем счётчик
                    existingEvent.count++;
                } else {
                    // Если событие встречается в первый раз, добавляем его с счётчиком 1
                    acc.push({
                        ...currentEvent,
                        count: currentEvent.data.isDuplicate ? 0 : 1 // Если текущее событие - дубликат, начинаем с 0
                    });
                }
                return acc;
            }, [])
            // Оставляем только оригинальные события (не дубликаты)
            .filter(event => !event.data.isDuplicate)
            // Корректируем свойство gridColumnEnd для каждого события
            .map(event => ({
                ...event,
                gridColumnEnd: event.count // gridColumnEnd равен количеству дубликатов
            }));

        const eventsWithPosition = this.calculateOverlaps(singleDayEvents);

        const updatedEvents = eventsWithPosition.map(event => {
            // Add additional properties to event object if needed
            return {
                ...event,
                // Use the calculated positions for left offset and width
                leftOffset: event.leftOffset,
                width: event.width,
                // Your existing properties
                topOffset: event.topOffset,
                height: event.height,
            };
        });

        return {
            ...day,
            data: updatedEvents,
            multiDayEvents: multiDayEventsWithCounts
        };
    }

    static calculateOverlaps(events) {
        // Преобразуем события в массивы с дополнительной информацией о времени начала и конца в минутах
        const eventsWithTimeInfo = events.map(event => ({
            ...event.data,
            startMinutes: this.convertToMinutes(event.data.startTime),
            endMinutes: this.convertToMinutes(event.data.endTime),
        }));

        // Сортировка событий по времени начала
        eventsWithTimeInfo.sort((a, b) => a.startMinutes - b.startMinutes);

        // Группировка событий по временным слотам
        const timeSlots = {};
        eventsWithTimeInfo.forEach(event => {
            for (let time = event.startMinutes; time < event.endMinutes; time++) {
                if (!timeSlots[time]) {
                    timeSlots[time] = [];
                }
                timeSlots[time].push(event);
            }
        });

        // Рассчитываем максимальное количество параллельных событий в каждом слоте
        let maxParallelEvents = 0;
        Object.values(timeSlots).forEach(slot => {
            if (slot.length > maxParallelEvents) {
                maxParallelEvents = slot.length;
            }
        });

        // Рассчитываем ширину и горизонтальное смещение для каждого события
        const updatedEvents = eventsWithTimeInfo.map(event => {
            // Поиск количества событий, которые пересекаются с текущим событием
            let parallelEventsCount = 0;
            for (let time = event.startMinutes; time < event.endMinutes; time++) {
                if (timeSlots[time] && timeSlots[time].length > parallelEventsCount) {
                    parallelEventsCount = timeSlots[time].length;
                }
            }

            const width = 100 / parallelEventsCount; // Рассчитываем ширину
            // Найти позицию текущего события в слоте
            const position = timeSlots[event.startMinutes].findIndex(e => e === event);
            const leftOffset = width * position; // Рассчитываем смещение влево

            const startMinutes = this.convertToMinutes(event.startTime);
            const duration = this.calculateEventDuration(event);
            const topOffset = (startMinutes / 30) * 50;
            const height = (duration / 30) * 50;
            return {
                ...event,
                width,
                leftOffset,
                topOffset,
                height
            };
        });
        return updatedEvents;
    }

    static getDifferenceInDays(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return Math.round((end - start) / (1000 * 60 * 60 * 24)); // +1 включает обе границы
    }

    static getColumnIndexFromDate(date, startOfWeek) {
        const eventDate = new Date(date);
        const startDate = new Date(startOfWeek);
        // Получаем количество дней между началом недели и датой события
        const daysDifference = (eventDate - startDate) / (1000 * 60 * 60 * 24);

        return 1 + daysDifference; // Вторая колонка соответствует первому дню недели
    }
}

export default EventsUtils;