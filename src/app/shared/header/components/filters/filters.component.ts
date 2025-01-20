import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatLabel, MatFormField } from '@angular/material/form-field';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { NavigationService } from '../../../../core/services/navigation.service';

@Component({
  selector: 'app-filters',
  imports: [
    CommonModule,
    MatLabel,
    MatFormField,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
  ],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  @Output() filterChange = new EventEmitter<any>();

  filtersForm: FormGroup;

  comparisonOptions = [
    { label: 'Greater than', value: 'gt' },
    { label: 'Less than', value: 'lt' },
  ];

  constructor(
    private navigationService: NavigationService,
    private fb: FormBuilder
  ) {
    this.filtersForm = this.fb.group({
      unitCost: [''],
      unitCostComparison: ['gt'],
      totalSales: [''],
      totalSalesComparison: ['gt'],
    });
  }

  navigateToCatalog() {
    this.navigationService.goToCatalog();
  }

  navigateToCreateProduct() {
    this.navigationService.goToCreateProduct();
  }

  applyFilters(): void {
    this.filterChange.emit(this.filtersForm.value);
  }

  resetFilters() {
    this.filtersForm.reset({
      unitCostComparison: 'gt',
      totalSalesComparison: 'gt',
    });
    this.applyFilters();
  }
}
