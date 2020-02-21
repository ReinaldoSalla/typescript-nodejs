import fs from "fs";
import winston from "winston";
import DateTimeConversor from "./utils/date-time-conversor"

export const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { 
        service: 'test-service',
        datetime: DateTimeConversor.convertToBrStandard(new Date)
    },
    transports: [
        new winston.transports.File({
            filename: "./src/logs/negotiation.log",
            maxsize: 100000,
            maxFiles: 10
        })
    ]
});
