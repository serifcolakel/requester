export default function EnvironmentPage() {
  // const { environments, create, loading, remove, update } = useEnvironments();

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      {/* <h1 className="text-2xl font-bold text-center">
        Environments ({environments.length})
      </h1>
      <Button onClick={() => create()}>Add Environment</Button>
      <div className="space-y-2">
        {environments.map((env) => (
          <div className="flex flex-row gap-x-4" key={env.id}>
            <Input
              onBlur={(e) =>
                update({
                  id: env.id,
                  name: e.target.value,
                })
              }
              placeholder="Variable Name"
              type="text"
              value={env.name}
            />
            <Button onClick={() => remove(env.id)} variant="destructive">
              Delete
            </Button>
          </div>
        ))}
      </div> */}
    </div>
  );
}
