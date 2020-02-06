import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { FetcherService } from '../fetcher.service';
import { debounceTime, map, distinctUntilChanged, filter } from "rxjs/operators";
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-suggestbox',
  templateUrl: './suggestbox.component.html',
  styleUrls: ['./suggestbox.component.css']
})
export class SuggestboxComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('searchInput', {static: false}) input: ElementRef;
  items: any[] = [];
  private $keyUp: Subscription;
  private $outsideClick: Subscription;
  private picSize = 42;
  private debounceTime = 500;
  constructor(private fetcher: FetcherService) { }

  private handleError(data) : boolean {
    if(data.hasOwnProperty('name') && data.name == 'AjaxError'){
      this.items = [];
      return true;
    } else {
      return false;
    }
  }

  private initKeyUp(): void {
    this.$keyUp = fromEvent(this.input.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      })
      ,debounceTime(this.debounceTime)
      ,distinctUntilChanged()
    ).subscribe((text: string) => this.fetch(text));
  }

  fetch(text): void {
    if(text === ''){
      this.items = [];
      return;
    }
    this.fetcher.getData(text).subscribe(data => {
      if(!this.handleError(data)){
        this.items = data.items;
      }
    });
  }

  private initGlobalClick(): void {
    this.$outsideClick = fromEvent(document, 'click').subscribe(c => {
      this.items = [];
    });
  }

  ngOnInit() { }

  ngAfterViewInit(){
    this.initKeyUp();
    this.initGlobalClick();
  }

  ngOnDestroy(){
    this.$keyUp.unsubscribe();
    this.$outsideClick.unsubscribe();
  }

}
