import * as React from 'react';
import styles from './Contentportalstartpage.module.scss';
import { IContentportalstartpageProps } from './IContentportalstartpageProps';
import { ICategory, ILink } from '../../../dataproviders/ContentDataProvider';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { escape } from '@microsoft/sp-lodash-subset';

export interface IContentPortalState {
  originalitems: ICategory[];
  viewitems: ICategory[];
  filter: string;
  selectedKey: string;
}

export default class Contentportalstartpage extends React.Component<IContentportalstartpageProps, IContentPortalState> {
  
  constructor(props: IContentportalstartpageProps) {      
    super(props);

    this.state = {
      originalitems: [],
      viewitems: [],
      filter: "",
      selectedKey: 'A'
    };

    this.changeView = this.changeView.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
  }  

  public componentDidMount() {  
    this.props.provider.getContent(this.props.contenttypeid, this.props.categoryfield, this.props.responsiblefield, this.props.revisedfield).then((_items: ICategory[]) => {  
      this.setState({
        viewitems: _items,
        originalitems: _items
      });  
    });  
  }  

  private generateCategory(cat: ICategory): JSX.Element {
    const links: JSX.Element[] = [];

    cat.links.sort((i1, i2) => {
      return i1.title < i2.title ? -1 : 1;
    })
    .map((link: ILink) => {
      if (this.state.selectedKey == 'C' && new Date(link.revised) < new Date("2018-03-22")) {
        links.push(<a className="ms-Grid-col ms-xl3" href={link.url} title={link.title + " " + link.revised}><span style={{"color": "tomato"}}>{link.title}</span></a>);  
      } else {
        links.push(<a className="ms-Grid-col ms-xl3" href={link.url} title={link.title + " " + link.revised}>{link.title}</a>);
      }
    });

    return (      
      <React.Fragment>
        <div className={styles["adw-link-list-container"] + " ms-Grid-col ms-xl12"}>
          <h2>{cat.name}</h2>
        </div>
        <hr className={styles["adw-separator"]} style={{"borderColor":"#50AA00"}} />
        {links}
      </React.Fragment>    
    );
  }

  private generateBoxes(nrofboxes: string): JSX.Element {
    const boxes: JSX.Element[] = [];
    const size: number = 12 / Number(nrofboxes);
    const clsName: string = "ms-Grid-col ms-lg" + size + " ms-xl" + size;

    for (var i = 1; i <= Number(nrofboxes); i++){
      boxes.push(
        <div className={"ms-Grid-col ms-lg" + size + " ms-xl" + size + " " + styles["adw-link-box-container"]}>
          <div className={styles["link-box"]}>
            <a href={this.props["linkurl" + i]}>
              <h4 className={styles["link-box-header-container"]}>
                <small className={styles["link-box-header-title"]}>{this.props["linktitle" + i]}</small>
                <span className={styles["link-box-header-text"]}>{this.props["linktext" + i]}</span>
              </h4>
            </a>
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        {boxes}
      </React.Fragment>
    );
  }

  public changeView = (option: IDropdownOption, index?: number): void => {
    const _items: ICategory[] = [];

    this.setState({
      filter: "",
      selectedKey: option.key.toString()
    });

    this.state.originalitems.map((elem) => {
      elem.links.map((link: ILink) => {
        let categoryName: string;
        
        switch (option.key) {
          case 'B':
            categoryName = link.title.substr(0, 1);
            break;
          case 'A':
            categoryName = link.category;
            break;
          case 'C':
            categoryName = link.responsible;
            break;
        }

        const category = _items.filter((cat: ICategory) => {
            return (cat.name == categoryName);
        });

        if (category.length) {
          category[0].links.push(link);
        } else {
            _items.push({name: categoryName, links: [link]});
        }
      });

    });

    this.setState({
      viewitems: _items,
      originalitems: _items
    });
  }

  private applyFilter = (newValue: any): void => {
    const newitems: ICategory[] = [];
    
    this.state.originalitems.map((category: ICategory) => {
      const cat: ICategory = {
        name: category.name,
        links: []
      };

      cat.links = category.links.filter((link: ILink, index: number) => {
        return link.title.toLowerCase().indexOf(newValue.toLowerCase()) > -1 ||
          link.content.toLowerCase().indexOf(newValue.toLowerCase()) > -1;
      });

      if (cat.links.length > 0) {
        newitems.push(cat);
      }
    });

    this.setState({
      viewitems: newitems,
      filter: newValue
    });
  }

  public render(): React.ReactElement<IContentportalstartpageProps> {
    //console.log("state");
    //console.log(this.state);

    const categories: JSX.Element[] = [];

    this.state.viewitems.sort((i1, i2) => {
        return i1.name < i2.name ? -1 : 1;
      })
      .map((cat: ICategory) => {
        categories.push(this.generateCategory(cat));
      });

    return (
      <React.Fragment>
        <div className="ms-Grid-col ms-lg12 ms-xl12">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-lg12 ms-xl12">
              <div className={styles['main-box']}>
                <h1 className={styles['link']}>{this.props.headertext}</h1>
              </div>
            </div>
          </div>
          {this.generateBoxes(this.props.nrofboxes)}
          <div className={`ms-Grid-row ${styles['separator']}`}>
            <hr className={styles["adw-separator"]} />
          </div>


          <div className={`ms-Grid-row ${styles["categories"]}`} >
          <div className="ms-Grid-row" style={{"position":"absolute","right":"8px","width":"100%","top":"36px","zIndex":1}}>
          <div className="ms-Grid-col ms-xl6"></div>
          <div className="ms-Grid-col ms-xl6" style={{"paddingLeft":"0"}}>
            <div className="ms-Grid-col ms-xl6">
              <Dropdown
                placeholder="Sortering"
                id="Basicdrop1"
                ariaLabel="Basic dropdown example"
                selectedKey={this.state.selectedKey}
                options={[
                  { key: 'A', text: 'Sortera efter kategori'},
                  { key: 'B', text: 'Sortera A-Ö' },
                  { key: 'C', text: 'Sortera efter ansvarig' },
                ]}
                onChanged={this.changeView}
              />
            </div>
            <div className="ms-Grid-col ms-xl6">
              <TextField label="" iconProps={{ iconName: 'Filter' }} onChanged={this.applyFilter} value={this.state.filter} />
            </div>
          </div>
          </div>
            {categories}
          </div>            
        </div>

      </React.Fragment>
    );
  }
}
