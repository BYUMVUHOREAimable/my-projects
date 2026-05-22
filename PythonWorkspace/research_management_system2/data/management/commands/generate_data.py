from django.core.management.base import BaseCommand
from data.utils import generate_sample_data, process_dataset, get_dataset_description
import pandas as pd
import json

class Command(BaseCommand):
    help = 'Generate and process sample research project data'

    def add_arguments(self, parser):
        parser.add_argument('--rows', type=int, default=500000)
        parser.add_argument('--output', type=str, default='research_data.csv')
        parser.add_argument('--describe', action='store_true')

    def handle(self, *args, **options):
        self.stdout.write('Generating dataset...')
        
        # Generate raw data
        df = generate_sample_data(options['rows'])
        
        # Process dataset
        df = process_dataset(df)
        
        # Save to CSV
        df.to_csv(options['output'], index=False)
        self.stdout.write(f'Dataset saved to {options["output"]}')
        
        if options['describe']:
            # Get and save description
            description = get_dataset_description(df)
            with open('dataset_description.json', 'w') as f:
                json.dump(description, f, indent=2, default=str)
            
            self.stdout.write('\nDataset Description:')
            self.stdout.write(f'Rows: {description["basic_info"]["rows"]}')
            self.stdout.write(f'Columns: {description["basic_info"]["columns"]}')
            self.stdout.write(f'Memory Usage: {description["basic_info"]["memory_usage"]:.2f} MB')
            
            self.stdout.write('\nNull Values:')
            for col, count in description['null_counts'].items():
                if count > 0:
                    self.stdout.write(f'{col}: {count}')