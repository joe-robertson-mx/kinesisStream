import { ReactElement, createElement, useState, useEffect } from "react";
import { KinesisVideoClient, GetDataEndpointCommand } from "@aws-sdk/client-kinesis-video";
import {
    KinesisVideoArchivedMediaClient,
    GetHLSStreamingSessionURLCommand
} from "@aws-sdk/client-kinesis-video-archived-media";
import ReactHlsPlayer from "react-hls-player";

export interface VideoPlayerProps {
    streamName: string;
    accessKey: string;
    secretKey: string;
    region: string;
    start: Date | undefined;
    end: Date | undefined;
}

export function VideoPlayer(props: VideoPlayerProps): ReactElement {
    const { accessKey, secretKey, streamName, region, start, end } = props;
    const [hlsURL, setHLSURL] = useState<string>("");

    useEffect(() => {
        if (accessKey && secretKey && streamName && region && start && end) {
            kinesisVid();
        }
    }, [accessKey, secretKey, region, streamName]);

    const kinesisVid = async () => {
        // Step 1: Configure SDK Clients

        try {
            const creds = {
                accessKeyId: accessKey,
                secretAccessKey: secretKey
            };

            const vidClient = new KinesisVideoClient({
                credentials: creds,
                region
            });

            const deCommand = new GetDataEndpointCommand({
                APIName: "GET_HLS_STREAMING_SESSION_URL",
                StreamName: streamName
            });

            const initResponse = await vidClient.send(deCommand);

            const client = new KinesisVideoArchivedMediaClient({
                credentials: creds,
                region,
                endpoint: initResponse.DataEndpoint
            });

            const fragment = {
                FragmentSelectorType: "PRODUCER_TIMESTAMP",
                TimestampRange: {
                    StartTimestamp: start,
                    EndTimestamp: end
                }
            };

            const command = new GetHLSStreamingSessionURLCommand({
                StreamName: streamName,
                PlaybackMode: "ON_DEMAND",
                HLSFragmentSelector: fragment,
                Expires: 60 * 60
            });

            const response = await client.send(command);
            setHLSURL(response.HLSStreamingSessionURL ? response.HLSStreamingSessionURL : "");
        } catch (error) {
            const errorMessage = `Connecting to stream ${streamName} failed with ${error.message}`;
            console.error(errorMessage, error);
            throw error;
        }
    };

    return (
        <div>
            {hlsURL && <ReactHlsPlayer src={hlsURL} autoPlay={false} controls width="100%" height="auto" />}
            {!hlsURL && <h2>No Video Stream Found</h2>}
        </div>
    );
}
