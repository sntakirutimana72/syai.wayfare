const comStruct = () => {
  const [dayName, month, day, year, ctime, ...zone] = Date().split(' ');
  return {dayName, month, day, year, ctime, zone};
}
/**
  * Date API to format date into human readable structure
  * It takes no parameter
*/
class HumanizeDate {
  /**
    * @Method for current time like HH:mm:ss
  */
  static cTime() {
    const { ctime } = comStruct();
    return ctime;
  }
  /**
    * @Method for current date like (Fri dd-mm-yy)
  */
  static curDate() {
    const {dayName, day, month, year} = comStruct();
    return `${dayName} ${day}-${month}-${year}`;
  }
  /**
    * @Method for time-zone
  */
  static timeZone() {
    const { zone } = comStruct();
    return zone.join(' ');
  }
}

export default HumanizeDate;
