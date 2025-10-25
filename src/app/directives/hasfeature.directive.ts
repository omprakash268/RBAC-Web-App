import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionService } from '../services/permission.service';

@Directive({
  selector: '[appHasFeature]'
})
export class HasfeatureDirective {

  private currentFeature: string | null = null;

  constructor(
    private tpl: TemplateRef<any>,
    private vc: ViewContainerRef,
    private perm: PermissionService
  ) {}

  @Input()
  set appHasFeature(feature: string) {
    this.currentFeature = feature;
    this.update();
  }

  private update() {
    if (!this.currentFeature) { this.vc.clear(); return; }
    
    const allowed = this.perm.hasFeature(this.currentFeature as any);
    
    if (allowed){
      this.vc.createEmbeddedView(this.tpl);
    } else {
      this.vc.clear();
    }
  }

}
