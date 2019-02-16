import * as React from 'react';
import { CacheManager } from "../../common/CacheManager";
import { ITagsDataProvider } from "../../interfaces/ITagsDataProvider";
import Tags from "./Tags";
import styles from './TagsContainer.module.scss';

import { Dialog, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

export interface ITagsContainerProps {
    provider: ITagsDataProvider;
}

export interface ITagsContainerState {
    allTags: Tags[],
    userTags: Tags[],
    userCollectedTags: Tags[]
}

export default class TagsContainer extends React.Component<ITagsContainerProps, ITagsContainerState> {
    private readonly cacheKey = 'UserTags'
    constructor(props: ITagsContainerProps) {
        super(props);
        this.state = {
            allTags: [],
            userTags: [],
            userCollectedTags: []
        };
    }; // End Constructor

    public componentDidMount(): void {
        var cacheManager = new CacheManager();
        var cacheValue = cacheManager.get(this.cacheKey);

        if (cacheValue) {
            this.setState({
                userTags: cacheValue
            });

            return;
        }

        this.props.provider.getAllTags().then((tags) => {
            if(tags != null) {
                cacheManager.set(this.cacheKey, tags);
            }

            this.setState({
                allTags: tags
            });
        });

        console.log('COMPONENTDIDMOUNT: ' + this.state.userTags); 
    }

    private renderTags(tag: Tags, index:number) {
        
        return <div>
            <p onClick={(e) => { e.stopPropagation(); this.collectTags(tag,index); return false;}}>
                # {tag.title} <i className="ms-Icon ms-Icon--CirclePlus"></i>
            </p>
        </div>
    }

    private collectTags(tags: Tags, index: any): any {
       console.log('TAG INDEX: ' + Tags[index]);
       Tags[index].active = true;


        //Tags[i].active = true;
        //let userCollectedTags: Tags[] = this.state.userCollectedTags;
        /* console.log('renderTags: ' + tag + ' - ' + index);
        console.log('renderTags: ' + tag[index]); */
       /*  let userCollectedTags: Tags[] = this.state.userCollectedTags;
        userCollectedTags.push(tag); */

         this.setState({

            allTags: tags
        });
      
       
    }

    private saveTags(): void {
        console.log('SAVETAGS: ' + this.state.userCollectedTags.length);
        
        let uCollectedTags = this.state.userCollectedTags;
        debugger;
        this.setState({
            userTags: uCollectedTags,
        })

       

        console.log('AFTER SETSTATE: ' + this.state.userTags); // gives 0
        
    }

    public render(): JSX.Element {
        return <div className={styles.tagsContainer}>
            <div>
                <h1>What are you interested in?</h1>
                <p>We'll show you more stories from the topics you pick below</p>
            </div>
            <div  className={styles.tagCloud}>
                  {this.state.allTags.slice(0, 12).map((t,index) => this.renderTags(t,index))}
                
            </div>
            <div></div>
            <div>
                <DefaultButton 
                    text="Done"
                    style={{ backgroundColor: '#ff0033', color: '#ffffff' }}
                    onClick={(e) =>{e.stopPropagation(); this.saveTags(); return false;}}
                />
            </div>
        </div>
    }
}