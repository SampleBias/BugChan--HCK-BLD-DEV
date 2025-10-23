import { DurableObject } from "cloudflare:workers";
import type { Bug } from '@shared/types';
const BUGS_STORAGE_KEY = 'bugs_list';
// **DO NOT MODIFY THE CLASS NAME**
export class GlobalDurableObject extends DurableObject {
    async getBugs(): Promise<Bug[]> {
      const bugs = await this.ctx.storage.get<Bug[]>(BUGS_STORAGE_KEY);
      return bugs || [];
    }
    async addBug(bug: Bug): Promise<Bug[]> {
      const bugs = await this.getBugs();
      const updatedBugs = [...bugs, bug];
      await this.ctx.storage.put(BUGS_STORAGE_KEY, updatedBugs);
      return updatedBugs;
    }
}