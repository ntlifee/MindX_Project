import { useEffect, useState } from 'react';
import moment from 'moment';
import classes from './gameinformationpanel.module.css';

const GameInformationPanel = (props) => {
    const { score, endDate } = props;
    const [timeLeft, setTimeLeft] = useState('00:00:00');

    useEffect(() => {
        if (!endDate) return;

        const calculateTimeLeft = () => {
            const now = moment();
            const end = moment(endDate);
            const difference = moment.duration(end.diff(now));

            if (difference <= 0) {
                setTimeLeft('00:00:00');
                return;
            }

            const days = Math.floor(difference.asDays());
            const hours = difference.hours();
            const minutes = difference.minutes();
            const seconds = difference.seconds();
            let formattedTime = '';
            if (days > 0) {
                formattedTime = `${days}д `        
            }
            formattedTime += `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            setTimeLeft(formattedTime);
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [endDate]);

    return (
        <div className={classes.information_panel}>
            <div className={classes.score}>
                <span className={classes.score_string}>ОЧКИ</span>
                <span className={classes.score_int}>{score ? score : 0}</span>
            </div>
            <div className={classes.time}>
                <span className={classes.time_string}>ВРЕМЯ</span>
                <span className={classes.time_date}>{timeLeft}</span>
            </div>
        </div>
    );
};

export default GameInformationPanel;