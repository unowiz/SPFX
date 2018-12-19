import * as React from 'react';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

export interface IMessageComponentProps {
    Message: string;
    Type: MessageBarType;
    Display: boolean;
}

export default class MessageComponent extends React.Component<IMessageComponentProps, any> {
    public constructor(props: IMessageComponentProps) {
        super(props);
    }

    public render(): React.ReactElement<IMessageComponentProps> {
        return(
            <div className={`ms-Grid-row`}>
                <div className={`ms-Grid-col ms-sm12`}>
                    {
                        this.props.Display &&
                        <div>
                            <MessageBar
                                messageBarType={MessageBarType.error}
                                isMultiline={false}
                                dismissButtonAriaLabel="Close">
                                    {this.props.Message}
                                </MessageBar>
                        </div>
                    }
                </div>
            </div>
        );
    }
}