export default class DateTimeConversor {

    static convertToBrStandard(date: Date) {
        return (`
            ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
        ).replace((/  |\r\n|\n|\r/gm),"");
    }
}