import type { EHTNamespaceName } from '../interface';
import { Service } from 'services';
import { createMenu, Context, Menu, OnClickData } from 'providers/menu';
import { openInTab } from 'providers/utils';
import { Tagging } from 'services/tagging';

@Service()
export class TagContextMenu implements Menu {
    constructor(readonly tagging: Tagging) {
        this.init();
    }

    private init(): void {
        createMenu(this);
    }
    readonly documentUrlPatterns = [
        '*://exhentai.org/*',
        '*://exhentai55ld2wyap5juskbm67czulomrouspdacjamjeloj7ugjbsad.onion/*',
        '*://e-hentai.org/*',
        '*://*.exhentai.org/*',
        '*://*.exhentai55ld2wyap5juskbm67czulomrouspdacjamjeloj7ugjbsad.onion/*',
        '*://*.e-hentai.org/*',
    ];
    readonly title = '提交标签翻译';
    readonly targetUrlPatterns = [
        '*://exhentai.org/tag/*',
        '*://exhentai55ld2wyap5juskbm67czulomrouspdacjamjeloj7ugjbsad.onion/tag/*',
        '*://e-hentai.org/tag/*',
        '*://*.exhentai.org/tag/*',
        '*://*.exhentai55ld2wyap5juskbm67czulomrouspdacjamjeloj7ugjbsad.onion/tag/*',
        '*://*.e-hentai.org/tag/*',
    ];
    readonly contexts: Context[] = ['link'];

    readonly onclick = (info: OnClickData): void => {
        if (!info.url?.includes('/tag/')) {
            return;
        }
        const seg = info.url.split('/').pop()?.replace(/\+/g, ' ').split(':') ?? [];
        const namespace = seg.length <= 1 ? 'temp' : (seg[0] as EHTNamespaceName);
        const key = seg.pop() ?? '';
        openInTab(this.tagging.editorUrl({ namespace, key }));
    };
}
