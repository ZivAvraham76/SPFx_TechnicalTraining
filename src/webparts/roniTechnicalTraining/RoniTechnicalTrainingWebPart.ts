import { AadHttpClient, HttpClientResponse } from "@microsoft/sp-http";
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneCheckbox,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'RoniTechnicalTrainingWebPartStrings';
import RoniTechnicalTraining from './components/RoniTechnicalTraining';
import { IRoniTechnicalTrainingProps } from './components/IRoniTechnicalTrainingProps';

export interface IRoniTechnicalTrainingWebPartProps {
  description: string;
  pillars: string[];
  [key: string]: any;
  //here we add all the input fildes names from the client

}

export default class RoniTechnicalTrainingWebPart extends BaseClientSideWebPart<IRoniTechnicalTrainingWebPartProps> {

  private Client: AadHttpClient;
  private trainingData: any;
  private newPilar: string = '';
  private checkbox: string[];
  //roni
  // private ClientId: any;



  public render(): void {
    if (!this.trainingData) {
      this.domElement.innerHTML = `<p>Loading...</p>`;

      this.Client.get(
        "http://localhost:3001/sp-data/4sp",
        AadHttpClient.configurations.v1
      )
        .then((response: HttpClientResponse): Promise<any> => {
          if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data: any): void => {
          this.trainingData = data;
          this.render(); // Re-render after data is fetched
        })
        .catch((error) => {
          console.error(error);
        });

      return;
    }

    const element: React.ReactElement<IRoniTechnicalTrainingProps> = React.createElement(
      RoniTechnicalTraining,
      {
        trainingData: this.trainingData,
        description: this.properties.description || "Technical Training",
        pillars: this.properties.pillars || []
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return new Promise<void>(
      (resolve: () => void, reject: (err: any) => void): void => {
        this.context.aadHttpClientFactory
          .getClient("api://56214ef0-66f7-4e05-b871-eed7a16a7fb8/")
          .then((client: AadHttpClient): void => {
            this.Client = client;
            if (!this.properties.pillars) {
              this.properties.pillars = [];
            }
            if (!this.checkbox){
              this.checkbox = [];
            }
            resolve();
          });
      }
    );
  }


  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    const { semanticColors } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty(
        "--bodyText",
        semanticColors.bodyText || null
      );
      this.domElement.style.setProperty("--link", semanticColors.link || null);
      this.domElement.style.setProperty(
        "--linkHovered",
        semanticColors.linkHovered || null
      );
    }
  }
  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }
  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    
    if (propertyPath.startsWith('pillar_')) {
      const index = parseInt(propertyPath.split('_')[1], 10);
      console.log(this.checkbox)
      if (newValue===false) {
        this.properties.pillars = this.properties.pillars.filter(p => p !== this.checkbox[index]);
        console.log(this.properties.pillars)
        this.context.propertyPane.refresh();
        this.render();

      }
      else if (this.properties.pillars.indexOf(this.checkbox[index]) === -1) {
        this.properties.pillars = [...this.properties.pillars, this.checkbox[index]];
        this.context.propertyPane.refresh();
        this.render();
      }

    }
    if (propertyPath === "newPilar") {
      this.newPilar = newValue;
    }
    if (propertyPath === "description") {
      this.render();
    }
    
 
  }

  protected onPropertyPaneConfigurationComplete(): void {
    if (this.newPilar && this.properties.pillars.indexOf(this.newPilar) === -1) {
      this.properties.pillars = [...this.properties.pillars, this.newPilar];
      this.checkbox = [...this.checkbox, this.newPilar]
      this.newPilar = '';
    }
    this.render()
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const dynamicFields = this.checkbox.map((pillar, index) => 
      PropertyPaneCheckbox(`pillar_${index}`, {
        text: pillar,
        checked: true
        
      })
  
    );

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            },
            {
              groupName: "Dynamic Fields",
              groupFields: [
                PropertyPaneTextField('newPilar', {
                  label: "Add a new pilar",
                  description: "Type the pilar name and press enter",
                  onGetErrorMessage: (value) => {
                    if (this.properties.pillars.indexOf(value) !== -1) {
                      return "Pilar already exists!";
                    }
                    return "";
                  }
                }),
                ...dynamicFields
              ]
            }
          ]
        }
      ]
    };
  }
}