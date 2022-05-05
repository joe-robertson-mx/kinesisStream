import { ReactElement, createElement } from "react";
import { VideoPlayer } from "./components/VideoPlayer";
import { KinesisStreamContainerProps } from "../typings/KinesisStreamProps";

import "./ui/KinesisStream.css";

export function KinesisStream(props: KinesisStreamContainerProps): ReactElement {
    const { streamName, accessKey, secretKey, region, startDate, endDate } = props;

    return (
        <VideoPlayer
            streamName={streamName.displayValue}
            accessKey={accessKey}
            secretKey={secretKey}
            region={region}
            start={startDate.value}
            end={endDate.value}
        />
    );
}
