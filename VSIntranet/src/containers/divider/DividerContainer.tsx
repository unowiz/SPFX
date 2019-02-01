import * as React from 'react';
import * as _ from 'lodash';
import { List } from 'office-ui-fabric-react/lib/List';
import { IRectangle } from 'office-ui-fabric-react/lib/Utilities';
import { IconButton, IButtonProps, PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';


import styles from './DividerContainer.module.scss';
import { CacheManager } from '../../common/CacheManager';
import { IDividerDataProvider } from '../../interfaces/IDividerDataProvider';
import { ListRepository } from '../../repositories/ListRepository/ListRepository';
import Dialog, { DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import Widget from './Widget';
import WidgetSettingsItem from './WidgetSettingsItem';

export interface IDividerContainerProps {
  provider: IDividerDataProvider;
}

export interface IDividerContainerState {
  items: any[];
  loading: boolean;
  hasItems: boolean;
  settingsDialogOpen: boolean;
  settingsItems: WidgetSettingsItem[];
  savingSettings: boolean;
}
const ROWS_PER_PAGE = 3;
const MAX_ROW_HEIGHT = 250;
export default class DividerContainer extends React.Component<IDividerContainerProps, IDividerContainerState> {
  private _columnCount: number;
  private _columnWidth: number;
  private _rowHeight: number;

  constructor(props: IDividerContainerProps) {
    super(props);
    this.state =
      {
        items: [],
        loading: true,
        hasItems: false,
        settingsDialogOpen: false,
        settingsItems: [],
        savingSettings: false
      };
  }

  public componentDidMount(): void {
    let cacheKey = "dividerLinks";
    var cacheManager = new CacheManager();
    var cachedValue = cacheManager.get(cacheKey);
    if (cachedValue) {
      this.setState(
        {
          items: cachedValue,
          loading: false,
          hasItems: cachedValue.length > 0,
          settingsDialogOpen: false,
          settingsItems: [],
          savingSettings: false
        }
      );

      return;
    }

    this.props.provider.getUserWidgets().then((allItems) => {
      let result = _.concat(allItems["local"], allItems["global"]);

      cacheManager.set(cacheKey, result);

      this.setState({
        items: result,
        loading: false,
        hasItems: result.length > 0,
        settingsItems: []
      });
    });
  }


  private showDialog(): void {
    this.props.provider.getSettingsData().then((items) => {
      this.setState({ settingsItems: items, settingsDialogOpen: true });
    });
  }

  private saveSettings(): void {
    var data = this.state.settingsItems;
    this.setState({ savingSettings: true });

    this.props.provider.saveSettingsData(data).then((result) => {

      var activeWidgets = data.filter((item) => { if (item.selected) return item; }).map(item => item.widget);

      this.setState({
        settingsDialogOpen: false,
        savingSettings: false,
        items: activeWidgets
      });
    });
  }

  private closeDialog(): void {
    this.setState({ settingsDialogOpen: false });
  }

  public render(): JSX.Element {
    if (this.state.loading) {
      return <div>Loading</div>;
    }

    return <div className={styles.divider}><div className={styles.container}>
      <div>
        <IconButton
          id="OpenDialog"
          className={styles.settingsbutton}
          iconProps={{ iconName: 'Settings' }}
          onClick={this.showDialog.bind(this)} />
      </div>
      <List
        className={styles.dividerList}
        items={this.state.items}
        getItemCountForPage={this._getItemCountForPage}
        getPageHeight={this._getPageHeight}
        renderedWindowsAhead={0}
        onRenderCell={this._onRenderCell}
      />

      <Dialog
        hidden={!this.state.settingsDialogOpen}
        onDismiss={this.closeDialog}
        dialogContentProps={{
          type: DialogType.normal,
          title: "Settings for widgets",
          subText: "Select the widgets you would like to use.",
        }}
        modalProps={{
          titleAriaId: 'test',
          subtitleAriaId: 'test',
          isBlocking: true,
          containerClassName: 'ms-dialogMainOverride'
        }}
      >
        {this.state.savingSettings ? <div>Saving...</div> :


          <div>
            {this.state.settingsItems.map((item, index) => {
              return <div key={index}>
                <input
                  name={index.toString()}
                  id={index.toString()}
                  type="checkbox"
                  checked={item.selected}
                  onChange={(event) => {
                    let data = this.state.settingsItems;
                    data[index].selected = !data[index].selected;

                    this.setState({ settingsItems: data });
                  }}
                />

                <span className="padding">
                  <label htmlFor={index.toString()} key={index}>
                    {item.widget.title}
                  </label>
                </span>
              </div>;
            })}
          </div>
        }
        <DialogFooter>
          <PrimaryButton onClick={this.saveSettings.bind(this)} className={styles.button} text="Save" ></PrimaryButton>
          <DefaultButton onClick={this.closeDialog.bind(this)} text="Cancel"></DefaultButton>
        </DialogFooter>
      </Dialog>

    </div>
    </div>;
  }

  private _onRenderCell = (item: Widget, index: number | undefined): JSX.Element => {
    let iconClass = `${styles.Icon} ms-Icon ms-Icon--${item.icon}`;
    return (
      <div
        style={{
          width: 100 / this._columnCount + '%'
        }}
      >
        <div className={styles.widgetCell}>
          <a href={item.url} className={`${iconClass}`} ></a>
          <span className={styles.IconText}>{item.title}</span>
        </div>
      </div>
    );
  }

  private _getItemCountForPage(itemIndex: number, surfaceRect: IRectangle): number {
    if (itemIndex === 0) {
      this._columnCount = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
      this._columnWidth = Math.floor(surfaceRect.width / this._columnCount);
      this._rowHeight = this._columnWidth;
    }

    return this._columnCount * ROWS_PER_PAGE;
  }

  private _getPageHeight(itemIndex: number): number {
    return this._rowHeight * ROWS_PER_PAGE;
  }
}

/*


    <table className={styles.Icon}>
    {this.createDiv()}
    <span className={styles.divider}></span>
    </table>
 <div>

 </div>
*/