<?php

namespace App\Console\Commands;

use Illuminate\Console\GeneratorCommand;

class MakeRepository extends GeneratorCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:repository {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command to create new repository file';

    protected $type = 'Repository';

    protected function replaceClass($stub, $name)
    {
        $stub = parent::replaceClass($stub, $name);
        return str_replace('DummyRepository', $this->argument('name'), $stub);
    }

    protected function getStub()
    {
        return app_path() . '\Console\Stubs\make-repository.stub';
    }

    protected function getDefaultNamespace($rootNamespace)
	{
		return $rootNamespace . '\Repositories';
    }
    
    protected function getArguments()
    {
        return [
            ['name', InputArgument::REQUIRED, 'The name of the contract.'],
        ];
    }
}
