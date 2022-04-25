export default function FormSection({ children }) {
    return (
        <section className="flex flex-col sm:min-w-[540px] sm:mx-auto content-center justify-center sm:border bg-gray-200 dark:bg-slate-500 border-blue-900 dark:border-gray-200 sm:rounded shadow-md">
            {children}
        </section>
    );
}
