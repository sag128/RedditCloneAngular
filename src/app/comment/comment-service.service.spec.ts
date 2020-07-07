import { TestBed } from '@angular/core/testing';

import { CommentRequestService } from './comment-request.service';

describe('CommentRequestService', () => {
  let service: CommentRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
