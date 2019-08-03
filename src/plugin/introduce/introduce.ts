import './introduce.less';
import { getTagData } from '../../tool/tag-data';
const { tagList } = getTagData();

const taglist = document.querySelector('#taglist');
const gright = document.querySelector('#gright');
const introduceBox = document.createElement('div');
introduceBox.id = 'ehs-introduce-box';
if (gright) {
  gright.insertBefore(introduceBox, null);
}
if(taglist){
  taglist.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if(
      target &&
      target.nodeName === 'A' &&
      target.parentElement &&
      (
        target.parentElement.classList.contains("gt") ||
        target.parentElement.classList.contains("gtl") ||
        target.parentElement.classList.contains("gtw")
      )
    ){
      const isOpen = !!target.style.color;
      if(!isOpen){
        introduceBox.innerHTML = '';
        return;
      }
      const m = /'(.*)'/ig.exec(target.getAttribute('onclick'))
      if(!(m && m[1])) return;
      const m2 = m[1].split(':');
      let namespace = 'misc';
      let tag = '';
      if(m2.length == 1){
        tag = m2[0];
      } else {
        namespace = m2.shift();
        tag = m2.join(':');
      }
      const tagData = tagList.find(v => v.namespace === namespace && v.key === tag);

      const links = mdLinks(tagData.links);

      if (tagData) {
        introduceBox.innerHTML = `<div class="ehs-title">
<div>
  <div class="ehs-cn">${tagData.name}</div>
  <div class="ehs-en">${tagData.namespace}:${tagData.key}</div>
</div>
<span class="ehs-close" onclick="document.querySelector('#ehs-introduce-box').innerHTML = '';">×</span>
</div>
<div class="ehs-content">
${tagData.intro}
</div>
<div class="ehs-href">${links.map(link => `<a href="${link.href}" target="_blank">${link.title}</a>`).join()}</div>`;
      }
    }
  });
}

function mdLinks(mdText: string): {title: string, href: string}[] {
  var links: {title: string, href: string}[] = [];
  mdText.replace(/\[(.*?)\]\((.*?)\)/igm,function (text,alt,href,index) {
      links.push({
          title:alt,
          href:href,
      });
      return text;
  });
  return links
}