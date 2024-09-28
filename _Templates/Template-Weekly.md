---
title: 
date: <% moment(tp.file.creation_date()).utc().format("YYYY-MM-DD HH:mm:ss") %>
week: <% moment(tp.date.now()).utc().format("YYYY-[W]WW") %>
month: <% moment(tp.date.now()).utc().format("YYYY-MM") %>
Quarter: <% moment(tp.date.now()).utc().format("YYYY-[Q]Q") %>
year: <% moment(tp.date.now()).utc().format("YYYY") %>
categories:
  - 
tags:
  - 
description: 
comments: 
media_subpath: /assets/img/
---

<%*
const currentMoment = moment(tp.file.title, "GGGG-[W]WW");
const hash = '# ';
const slash = ' / ';
const pipe = ' | ';
const leftAngle = '❮ ';
const rightAngle = ' ❯';
tR += leftAngle;
tR += '[[' + currentMoment.format('YYYY') + ']]' + slash;
tR += '[[' + currentMoment.format('YYYY-[Q]Q|[Q]Q') + ']]' + slash;
tR += '[[' + currentMoment.format('YYYY-MM|MMMM') + ']]' + slash;
tR += '[[' + currentMoment.format('GGGG-[W]WW') + '|' + currentMoment.format('[Week] WW') + ']]';
tR += rightAngle;
tR += '\n';
tR += '\n';
tR += leftAngle;
currentMoment.add(-1,'weeks');
tR += '[[' + currentMoment.format('GGGG-[W]WW|[Week] WW') + ']]' + pipe;
currentMoment.add(1,'weeks');
tR += currentMoment.format('[Week] WW') + pipe;
currentMoment.add(1,'weeks');
tR += '[[' + currentMoment.format('GGGG-[W]WW|[Week] WW') + ']]';
currentMoment.add(-1,'weeks');
tR += rightAngle;
tR += '\n';
tR += '\n';
tR += leftAngle;
tR += '[[' + currentMoment.format('YYYY-MM-DD|ddd Do') + ']]' + pipe;
currentMoment.add(1,'days');
tR += '[[' + currentMoment.format('YYYY-MM-DD|ddd Do') + ']]' + pipe;
currentMoment.add(1,'days');
tR += '[[' + currentMoment.format('YYYY-MM-DD|ddd Do') + ']]' + pipe;
currentMoment.add(1,'days');
tR += '[[' + currentMoment.format('YYYY-MM-DD|ddd Do') + ']]' + pipe;
currentMoment.add(1,'days');
tR += '[[' + currentMoment.format('YYYY-MM-DD|ddd Do') + ']]' + pipe;
currentMoment.add(1,'days');
tR += '[[' + currentMoment.format('YYYY-MM-DD|ddd Do') + ']]' + pipe;
currentMoment.add(1,'days');
tR += '[[' + currentMoment.format('YYYY-MM-DD|ddd Do') + ']]';
tR += rightAngle;
%>

---
