import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { MOCK_CENTERS, MOCK_INSTRUCTORS, MOCK_TRAINEES } from '../../core/config/mock-data.config';
@Component({
  selector: 'app-landing',
  imports: [RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  totalCenters=MOCK_CENTERS.length;
  totalInstructors=MOCK_INSTRUCTORS.length;
  totalTrainees=MOCK_TRAINEES.length;
}
