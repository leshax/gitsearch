# GitHubSearch component 

![logo](https://sun9-53.userapi.com/c206624/v206624262/5c1ff/E3wiEna8USE.jpg)

#Installation
npm update
ng serve


## SuggestBox component

### private handleError(data) : boolean 
Function which is executed each time we recieve data from Fetcher Service. 
We check if there is an error emited from Ajax Observable in Fetcher Service and react in this function.

### private initKeyUp(): void
In this method we init $keyUp variable with Observable object.
This observable emits values when user is typing text.
Debounce affect is added to prevent extra HTTP requests.
Subscriber calls component fetch method to recieve data with typed search string.

### fetch(): void
Method which calls getData(param) from Fetch Service to make an HTTP request.

### private initGlobalClick(): void
In this method we init $outsideClick variable with Observable object.
This observable emits event when user does a mouse click. 
Subscriber function reacts on mouse click by hiding a dropdown.


### ngAfterViewInit()
Angular Hook where we call initGlobalClick(), initKeyUp()

### ngOnDestroy()
Angular Hook which is called when component is being destroyed.

## Fetcher service

### public getData(searchText: string)
Method which perfoms http request and returns Observable.
