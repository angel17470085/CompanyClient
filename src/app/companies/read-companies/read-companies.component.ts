import { Component, OnInit } from '@angular/core';
import { CompaniesCrudService } from 'src/app/_services/companies-crud.service';

@Component({
  selector: 'app-read-companies',
  templateUrl: './read-companies.component.html',
  styleUrls: ['./read-companies.component.css']
})
export class ReadCompaniesComponent implements OnInit {
  listOfCompanies: any;

  constructor(private companyService: CompaniesCrudService){}

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies(){
    this.companyService.getCompanies().subscribe({
      next :(response) => {
        this.listOfCompanies = response.map((item:any)=> item.entity);
        console.log(this.listOfCompanies);
      }
    })
  }

}
