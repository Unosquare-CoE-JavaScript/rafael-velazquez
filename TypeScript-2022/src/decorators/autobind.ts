export function autobind(_target: any, _method: string, description: PropertyDescriptor) {
    const originalMethod = description.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    }
    return adjDescriptor;
}