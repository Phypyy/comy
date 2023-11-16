figma.showUI(__html__);
figma.ui.resize(300, 250);

figma.ui.onmessage = async (message) => {
  if (message.type === 'submitComment') {
    const comment = message.comment;
    const color = message.color;
    const fontSize = Number(message.fontSize);

    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    await figma.loadFontAsync({ family: "Sarabun", style: "Regular" });
    await figma.loadFontAsync({ family: "Sarabun", style: "Medium" });
    await figma.loadFontAsync({ family: "Sarabun", style: "SemiBold" });

    const selectedFrame = figma.currentPage.selection[0] as FrameNode;
    const frame = figma.createFrame();
    frame.name = "Comment";
    frame.layoutMode = 'VERTICAL';
    frame.counterAxisAlignItems = 'MIN';
    frame.counterAxisSizingMode = 'AUTO';
    frame.horizontalPadding = 24;
    frame.verticalPadding = 24;
    frame.itemSpacing = 24;
    frame.fills = [{ type: 'SOLID', color }];

    const text = figma.createText();
    text.characters = comment;
    text.fontName = { family: 'Sarabun', style: 'Medium' };
    text.fills = [{ type: 'SOLID', color: { r: 0.1608, g: 0.2039, b: 0.2863 } }];
    text.fontSize = fontSize;
    frame.appendChild(text);

    const dropShadowEffect: DropShadowEffect = {
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.1 },
      offset: { x: 0, y: 14 },
      radius: 21,
      spread: -5,
      visible: true,
      blendMode: 'NORMAL',
    };
    frame.effects = [dropShadowEffect];

    frame.x = selectedFrame.absoluteTransform[0][2] + selectedFrame.width + 32;
    frame.y = selectedFrame.absoluteTransform[1][2];

    figma.currentPage.appendChild(frame);

    const currentDate = new Date();
    const dateText = currentDate.toLocaleDateString('en-US');
    const dateTimeText = figma.createText();
    dateTimeText.characters = dateText;
    dateTimeText.fontName = { family: 'Sarabun', style: 'SemiBold' };
    dateTimeText.fills = [{ type: 'SOLID', color: { r: 0.1608, g: 0.2039, b: 0.2863 } }];
    dateTimeText.fontSize = 10;
    dateTimeText.blendMode = 'PASS_THROUGH';
    dateTimeText.opacity = 0.6;
    frame.appendChild(dateTimeText);


    //console.log();
  }
};
