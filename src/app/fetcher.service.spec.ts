import { TestBed } from '@angular/core/testing';

import { FetcherService } from './fetcher.service';

describe('FetcherService', () => {
  let service: FetcherService;
  const gitHubUser = 'leshax';
  beforeEach(() => { service = new FetcherService(); });
    it('#getData should return GitHub user data by login',
      (done: DoneFn) => {
      service.getData(gitHubUser).subscribe(response => {
        let user = response.items.find(user => user.login === gitHubUser);
        expect(user.login).toBe(gitHubUser);
        done();
      });
    });

    it('#getData should return limited number of suggested users',
      (done: DoneFn) => {
      service.getData('a').subscribe(response => {
        expect(response.items.length).toBeLessThanOrEqual(service.limit);
        done();
      });
    });

    it('#getData should return observable and emit error in case failed HTTP request',
      (done: DoneFn) => {
      service.getData(" ").subscribe(error => {
          expect(error.name).toBe('AjaxError');
          done();
      });
    });
});
