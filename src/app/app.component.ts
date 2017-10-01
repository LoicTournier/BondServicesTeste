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

  public ShareholderContainer: Shareholder;
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
