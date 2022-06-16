export function get_tree(obj, nodes=[], edges=[])
{
    nodes = [
        {
            id: '1',
            text: '1'
        },
        {
            id: '2',
            text: '2'
        }
    ];

    edges = [
        {
            id: '1-2',
            from: '1',
            to: '2'
        }
    ];

    return {
        nodes: nodes,
        edges: edges
    };
}
