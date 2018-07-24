import { ResourcePicker } from '@shopify/polaris/embedded';

export default function () {
    return <ResourcePicker
        products
        allowMultiple
        open={true}
        onSelection={(resources) => {
            console.log('Selected products: ', resources.products);
            // this.setState({ open: false });
        }}
    // onCancel={() => this.setState({ open: false })}
    />
}