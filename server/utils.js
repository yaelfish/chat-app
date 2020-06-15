const getCurrentTime = () => {
    let today = new Date();
    let minutes = today.getMinutes();
    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    let hours = today.getHours();
    hours = (hours < 10) ? `0${hours}` : hours;
    let now = hours + ":" + minutes;
    return now;
}

const getRandomColor = () => {
    let letters = '012345'.split('');
    let color = '#';
    color += letters[Math.round(Math.random() * 5)];
    letters = '0123456789ABCDEF'.split('');
    for (let i = 0; i < 5; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
} 

module.exports = { getCurrentTime, getRandomColor };