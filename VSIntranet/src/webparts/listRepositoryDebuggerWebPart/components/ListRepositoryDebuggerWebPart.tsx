import * as React from 'react';
import styles from './ListRepositoryDebuggerWebPart.module.scss';
import { IListRepositoryDebuggerWebPartProps } from './IListRepositoryDebuggerWebPartProps';

import { ListRepository } from '../../../repositories/ListRepository/ListRepository';
import { IListRepositoryDebuggerWebPartState } from './IListRepositoryDebuggerWebPartState';
import { MsGraphRepository } from '../../../repositories/MsGraphRepository/MsGraphRepository';
import { UserProfileRepository } from '../../../repositories/UserProfileRepository/UserProfileRepository';

export default class ListRepositoryDebugger extends React.Component<IListRepositoryDebuggerWebPartProps, IListRepositoryDebuggerWebPartState> {

  constructor(props: IListRepositoryDebuggerWebPartProps) {
    super(props);
    this.state = {
      hasItems: false,
      items: [],
      loading: true,
      user: null
    };
  }

  public componentDidMount(): void {
    if (this.props.webUrl) {
      var repository = new ListRepository(this.props.webUrl);

      var cacheKey = null;
      if (this.props.cacheResult) {
        cacheKey = 'ListRepositoryDebuggerWebPart';
      }
      
      repository.getListItemsByUrl(this.props.listTitle, cacheKey, Number(this.props.numberOfItems), this.props.filter).then((response) => {
        var items = repository.parseResponse(response);  
        this.setState({ 
            items: items, 
            loading: false,
            hasItems: items.length > 0
          });
      });
    }
    
    var userRepository = new MsGraphRepository(this.props.context);
    userRepository.getCurrentUser(true, ['displayName','mail','mobilePhone']).then((response) => {
      this.setState({
        user: response
      });
    }).catch((error) => {
      this.setState({
        user: 'Could not load user: ' + JSON.stringify(error)
      });
    });
  }

  private getUserProperties = () => {
    let userProfileRepository = new UserProfileRepository(this.props.context.pageContext.web.absoluteUrl);
    userProfileRepository.getCurrentUserProperties().then((response) =>{
      let result = userProfileRepository.parseResponse(response);
      let b = result;
    });
  }

  private createTable = () => {
    let table = []; 
    if (!this.state.hasItems) {
      table.push(<tr ><td>No items found! Did you forget to configure the webpart?</td></tr>);
      return table;
    }
    table.push(<tr>
    <th>Title</th>
    <th>Message</th>
    </tr>);

    this.state.items.forEach((item, index) => {
      table.push(<tr><td><span className="ms-Icon ms-Icon--FavoriteStar"></span>{item["Title"]}</td><td>{item["Message"]}</td></tr>);
    });

    return table;
  }

  public render(): React.ReactElement<IListRepositoryDebuggerWebPartProps> {
    return (
      <div className={ styles.ListRepositoryDebuggerWebPart }>
        <div className={ styles.container }>
          <span className={ styles.title }>List items from {this.props.title}</span>
          <table>
            {this.createTable()}
          </table>
        </div>
        <div>
          <h2>Current user</h2>
          <div>{JSON.stringify(this.state.user)}</div>
        </div>
        {this.getUserProperties()}
      </div>
    );
  }
}
