export default class DateTimeConversor {
    /*
    TODO: return always two numbers, e.g. avoid 12:1:1 - 2/2/2020
    */
    static convertToBrStandard(date: Date) {
        return (`
            ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
        ).replace((/  |\r\n|\n|\r/gm),"");
    }
}