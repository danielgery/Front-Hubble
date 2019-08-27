import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { User } from 'src/app/shared/components/user';
import { subscribeOn } from 'rxjs/operators';
import { EventsService } from 'src/app/shared/services/events.service';
import { element } from '@angular/core/src/render3';
import { Category } from 'src/app/shared/components/category';
import { delay } from 'q';
import { asQueryList } from '@angular/core/src/view';

@Component({
  selector: 'profile-event',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileViewComponent implements OnInit {
  user: any;
  categories: any;
  userCategories: any;
  difCategories: any;
  teste: string;

  private route: ActivatedRoute;
  constructor(private authService: AuthenticationService, private eventService: EventsService) {
  }

  updateCategory($event: Category) {
    this.eventService.updateCategory($event._id + '', this.user.id + '');
    delay(1000).then(any =>
      window.location.reload()
    )
  }

  getDiferenceBetweeenTwoArrays(categories: any, userCategories: any) {
    var result = []

    categories.forEach(element => {
      var aux = true;
      userCategories.forEach(elementToCompare => {
        if(element.title == elementToCompare.title){
          aux = false;
        }
      })
      if(aux){
        result.push(element);
      }
    })

    return result;
  }

  ngOnInit() {
    this.user = this.authService.currentUserValue;

    this.categories = this.eventService.getCategories()
      .subscribe((category: any) => {
        this.categories = category;
        console.log(this.categories)
      });

    this.userCategories = this.eventService.getCategoriesFromUser(this.user.id)
      .subscribe(category => {
        this.userCategories = category
        this.difCategories = this.getDiferenceBetweeenTwoArrays(this.categories, this.userCategories);
      });
  }
}
