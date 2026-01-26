import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);
dayjs.extend(timezone);

export function getCountdownInfo() {
	// date countdown
	const targetDate = '2025/01/01 00:00:00';
	const target = dayjs.tz(targetDate, 'Asia/Tokyo');
	const now = dayjs().tz('Asia/Tokyo');
	// diff
	const dateDiff = Math.ceil(target.diff(now, 'day', true));
	// console.log('dateDiff', dateDiff, now, target);
	const isNowCelebration = dateDiff == -1 || dateDiff == 0;
	const afterCelebration = dateDiff < 0;
	return {
		isNowCelebration,
		afterCelebration,
		dateDiff,
	};
}
