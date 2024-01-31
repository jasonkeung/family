import React from 'react';
import Tree from 'react-d3-tree';



const orgChart = {
    name: 'Family',
    children: [
        {
            name: 'Cindy Kim',
            attributes: {
                department: 'Production',
            },

            children: [
                {
                    name: 'Jason Keung',
                    attributes: {
                        department: 'Fabrication',
                    },
                    children: [
                        {
                            name: 'Worker',
                        },
                    ],
                },
                {
                    name: 'Foreman',
                    attributes: {
                        department: 'Assembly',
                    },
                    children: [
                        {
                            name: 'Worker',
                        },
                    ],
                },
            ],
        },
    ],
};

export function PeopleTree() {
    return (
        // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
        <div id="treeWrapper" style={{ width: '50em', height: '20em' }}>
            <Tree data={orgChart} orientation='vertical' />
        </div>
    );
}