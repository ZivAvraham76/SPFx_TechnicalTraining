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
import { Course } from './components/IRoniTechnicalTrainingProps';
import { badgesPointsData } from './components/IRoniTechnicalTrainingProps';


export interface IRoniTechnicalTrainingWebPartProps {
  description: string;
  pillars: string[];
  levels: string[];
  checkboxLevel: string[];
  checkboxPillars: string[];
  newPillar?: string;
  newLevel?: string;
  backend_app_id: string;
  backend_url: string;
}

interface TrainingData {
  producttraining: Course[];
  user: {
    userBadgesPointsData: badgesPointsData[];
  };
}
type PropertyPaneFieldValue = string | boolean | number | undefined;
export default class RoniTechnicalTrainingWebPart extends BaseClientSideWebPart<IRoniTechnicalTrainingWebPartProps> {

  private Client: AadHttpClient;
  private trainingData: {
    producttraining: Course[];
    user: {
      userBadgesPointsData: badgesPointsData[];
    };
  };
  private newPillar: string = '';
  private newLevel: string = '';



  public render(): void {
    if (!this.properties.backend_app_id) {
      this.domElement.innerHTML = `<p>No backend_app_id</p>`;
      return;
    }
    else if (!this.properties.backend_url) {
      this.domElement.innerHTML = `<p>No backend URL</p>`;
      return;

    } else
      if (!this.trainingData) {
        this.domElement.innerHTML = `<p>Loading...</p>`;

        this.Client.get(
          `${this.properties.backend_url}`,
          AadHttpClient.configurations.v1
        )
          .then((response: HttpClientResponse): Promise<TrainingData> => {
            if (!response.ok) {
              throw new Error(`API error: ${response.statusText}`);
            }
            return response.json();
          })
          .then((data: TrainingData): void => {
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
        pillars: this.properties.pillars || [],
        levels: this.properties.levels || []
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return new Promise<void>(
      (resolve: () => void, reject: (err: Error) => void): void => {
        this.context.aadHttpClientFactory
          //56214ef0-66f7-4e05-b871-eed7a16a7fb8
          .getClient(`api://${this.properties.backend_app_id}/`)
          .then((client: AadHttpClient): void => {
            this.Client = client;
            if (!this.properties.pillars) {
              this.properties.pillars = ["Quantum", "Harmony", "CloudGuard", "Infinity"];
            }
            if (!this.properties.levels) {
              this.properties.levels = ["All levels", "Fundamentals", "Advanced", "Expert"];
            }
            if (!this.properties.checkboxPillars) {
              this.properties.checkboxPillars = ["Quantum", "Harmony", "CloudGuard", "Infinity"];
            }
            if (!this.properties.checkboxLevel) {
              this.properties.checkboxLevel = ["All levels", "Fundamentals", "Advanced", "Expert"];
            }
            resolve();
          })
          .catch((err: Error) => reject(err)); // Handle promise rejection with Error type
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

  protected Sort(order: string | string[], proprty: string[]): void {
    proprty.sort((a, b) => {
      const indexA = order.indexOf(a);
      const indexB = order.indexOf(b);
      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
  }


  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: PropertyPaneFieldValue, newValue: PropertyPaneFieldValue): void {

    if (propertyPath.startsWith('pillar_')) {
      const index = parseInt(propertyPath.split('_')[1], 10);
      const thisPillar = this.properties.checkboxPillars[index]
      if (newValue === false) {
        this.properties.pillars = this.properties.pillars.filter(p => p !== thisPillar);
        this.context.propertyPane.refresh();
        this.render();
      }
      else if (this.properties.pillars.indexOf(thisPillar) === -1) {
        this.properties.pillars = [...this.properties.pillars, thisPillar];
        const order = ["Quantum", "Harmony", "CloudGuard", "Infinity"];
        this.Sort(order, this.properties.pillars)
        this.context.propertyPane.refresh();
        this.render();
      }
    }
    if (propertyPath.startsWith('level_')) {
      const index = parseInt(propertyPath.split('_')[1], 10);
      const thisLevel = this.properties.checkboxLevel[index]
      if (newValue === false) {
        this.properties.levels = this.properties.levels.filter(p => p !== thisLevel);
        this.context.propertyPane.refresh();
        this.render();

      }
      else if (this.properties.levels.indexOf(thisLevel) === -1) {
        this.properties.levels = [...this.properties.levels, thisLevel];
        const order = ["All levels", "Fundamentals", "Advanced", "Expert"];
        this.Sort(order, this.properties.levels)
        this.context.propertyPane.refresh();
        this.render();
      }
    }
    if (propertyPath === "newPillar") {
      this.newPillar = newValue as string;
    }
    if (propertyPath === "description") {

      this.render();
    }
    if (propertyPath === "backend_app_id") {
      this.onInit().catch(err => console.error(err));
    }
    if (propertyPath === "backend_url") {
      this.onInit().catch(err => console.error(err));
    }

    if (propertyPath === "newLevel") {
      this.newLevel = newValue as string;

    }
  }

  protected onPropertyPaneConfigurationComplete(): void {
    if (this.newPillar && this.properties.pillars.indexOf(this.newPillar) === -1) {
      this.properties.pillars = [...this.properties.pillars, this.newPillar];
      this.properties.checkboxPillars = [...this.properties.checkboxPillars, this.newPillar]
      this.newPillar = '';
    }
    if (this.newLevel && this.properties.levels.indexOf(this.newLevel) === -1) {
      this.properties.levels = [...this.properties.levels, this.newLevel];
      this.properties.checkboxLevel = [...this.properties.checkboxLevel, this.newLevel]
      this.newLevel = '';
    }
    this.context.propertyPane.refresh();
    this.render()
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const dynamicPilars = this.properties.checkboxPillars.map((pillar, index) =>
      PropertyPaneCheckbox(`pillar_${index}`, {
        text: pillar,
        checked: true
      })

    );
    const dynamicLevels = this.properties.checkboxLevel.map((level, index) =>
      PropertyPaneCheckbox(`level_${index}`, {
        text: level,
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
                PropertyPaneTextField('backend_app_id', {
                  label: "Please enter backend app id"
                }),
                PropertyPaneTextField('backend_url', {
                  label: "Please enter backend url"

                }),
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            },
            {
              groupName: "Pillars",
              groupFields: [
                PropertyPaneTextField('newPillar', {
                  label: "Add a new pillar",
                  description: "Type the pillar name and press enter",
                  onGetErrorMessage: (value) => {
                    if (this.properties.pillars.indexOf(value) !== -1) {
                      return "Pillar already exists!";
                    }
                    return "";
                  }
                }),
                ...dynamicPilars
              ]
            },
            {
              groupName: "Levels",
              groupFields: [
                PropertyPaneTextField('newLevel', {
                  label: "Add a new level",
                  description: "Type the level name and press enter",
                  onGetErrorMessage: (value) => {
                    if (this.properties.pillars.indexOf(value) !== -1) {
                      return "Level already exists!";
                    }
                    return "";
                  },
                }),
                ...dynamicLevels
              ]

            }
          ]
        }
      ]
    };
  }
}