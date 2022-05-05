/**
 * This file was generated from KinesisStream.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { EditableValue } from "mendix";

export interface KinesisStreamContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    accessKey: string;
    secretKey: string;
    region: string;
    streamName: EditableValue<string>;
    startDate: EditableValue<Date>;
    endDate: EditableValue<Date>;
}

export interface KinesisStreamPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    accessKey: string;
    secretKey: string;
    region: string;
    streamName: string;
    startDate: string;
    endDate: string;
}
