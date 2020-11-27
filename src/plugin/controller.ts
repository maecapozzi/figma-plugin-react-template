figma.showUI(__html__);

figma.ui.onmessage = async (msg) => {
    if (msg.type === 'semantic-version') {
        let textNode;
        const traverse = (node: any) => {
            if (node.name === 'SemanticVersion') {
                textNode = node;
            }

            if (node.children) {
                for (var i = 0; i < node.children.length; i++) {
                    if (node.children[i].name === 'SemanticVersion') {
                        textNode = node.children[i];
                    }

                    traverse(node.children[i]);
                }
            }
        };

        traverse(figma.root);
        const node = figma.getNodeById(textNode.id) as TextNode;
        await figma.loadFontAsync({family: 'Helvetica Neue', style: 'Bold'});
        node.characters = `v${msg.data.data.version}`;

        // This is how figma responds back to the ui
        figma.ui.postMessage({
            type: 'semantic-version',
            message: `Updated the cover page with the new version number: ${msg.data.data.version}`,
        });
    }

    figma.closePlugin();
};
