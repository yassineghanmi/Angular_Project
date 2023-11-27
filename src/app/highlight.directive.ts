import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnInit {
  @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';
  @HostBinding('class.open') toggleBtn: boolean = false;
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}
  ngOnInit(): void {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      'rgb(235, 243, 252)'
    );
  }
  @HostListener('mouseover') mouseOver() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', '#9bbcff');
    this.backgroundColor = 'rgb(235, 243, 252)';
  }
  @HostListener('mouseleave') mouseLeave() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'black');
    this.backgroundColor = 'transparent';
  }
  @HostListener('click') toggleOpen() {
    this.toggleBtn = !this.toggleBtn;
  }
}
