import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedTabPage } from './feed-tab.page';

describe('FeedTabPage', () => {
  let component: FeedTabPage;
  let fixture: ComponentFixture<FeedTabPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedTabPage ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have postList defined', () => {
    expect(component.postList).toBeDefined();
  });

  it('should have correct properties in postList', () => {
    component.postList = [
      {
        title: 'Test Title',
        content: 'Test Content',
        imageList: ['image1.jpg', 'image2.jpg'],
        likeCount: 0,
        commentCount: 0
      }
    ];
    fixture.detectChanges();
    expect(component.postList[0].title).toBe('Test Title');
    expect(component.postList[0].content).toBe('Test Content');
    expect(component.postList[0].imageList.length).toBe(2);
  });
});