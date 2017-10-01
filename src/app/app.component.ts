import { Component, OnInit } from '@angular/core';
import { CountryService } from './app.service';
export interface Shareholder {
  id?: number;
  process_id?: number;
  name?: string;
  percentage?: number;
  shareholder_type_id?: number;
  country_id?: number;
}

// Created a model so i can't instanciate it via this.ShareholderContainer = new ShareholderDummy();
export class ShareholderDummy {
  id?: number;
  process_id?: number;
  name?: string;
  percentage?: number;
  shareholder_type_id?: number;
  country_id?: number;

  constructor(id?: number, process_id?: number, name?: string, percentage?: number, shareholder_type_id?: number, country_id?: number) {
    this.id = id;
    this.process_id = process_id;
    this.name = name;
    this.percentage = percentage;
    this.shareholder_type_id = shareholder_type_id;
    this.country_id = country_id;
  }
}

export interface TypeOfShareholder {
  value: number;
  text: string;
}

export interface Country {
  value: number;
  text: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public ShareholderContainer: ShareholderDummy = new ShareholderDummy();
  country: Country[] = [];
  shareholder: Shareholder[] = [];
  typeOfShareHolder: TypeOfShareholder[] = [];

  constructor(private countryService: CountryService) {
    this.getCountry();
    this.getShareholderType();
    this.getShareholder();
  }

  ngOnInit() {
    console.log(this.country.length + 'Hello Init Country');
    if (this.shareholder.length < 1) {
      this.shareholder.push({ id: 1, name: 'Anibal', percentage: null, process_id: 7, country_id: 1, shareholder_type_id: 1 });
    }
  }

  onSubmit(form) {
    console.log('Current Shareholder form: ', form.form.value);
    // Should be replaced by a POST method, just wanted to demo it.
    this.shareholder.push(form.form.value);
    // Reset the container dummy to an empty state, as we may not want to push multiple of the same data by mistake.
    this.ShareholderContainer = new ShareholderDummy();
  }

  getCountry() {
    this.countryService.getPaises()
      .subscribe(country => {
        this.country = country
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('Country length: ' + this.country.length);
      })
  }

  getShareholderType() {
    this.countryService.getTipoAcionista()
      .subscribe(shareholderType => {
        this.typeOfShareHolder = shareholderType
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('type of shareholder length: ' + this.typeOfShareHolder.length);
      })
  }

  getShareholder() {
    this.countryService.getShareholder()
      .subscribe(shareholder => {
        console.log('Shareholder API Response: ', shareholder);
        this.shareholder = shareholder
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('shareholder lenght: ' + this.shareholder.length);
      })
  }
}
