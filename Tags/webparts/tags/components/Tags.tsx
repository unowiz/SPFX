import * as React from 'react';
import { ITagsProps } from './ITagsProps';
import * as _ from 'lodash';
import TagsContainer from "../../../containers/tags/TagsContainer";
import { ITagsDataProvider } from "../../../interfaces/ITagsDataProvider";
import TagsDataProvider from "../../../dataproviders/TagsDataProvider";

export default class Tags extends React.Component<ITagsProps, {}> {
  constructor(props: ITagsProps) {
    super(props);
  }

  public render(): React.ReactElement<ITagsProps> {
    const provider: ITagsDataProvider = new TagsDataProvider(this.props.context.pageContext.web.absoluteUrl, this.props.context);
    sessionStorage.clear();
    return (
      
      <div>
        <TagsContainer provider={provider} />
      </div>
    );
  }
}
