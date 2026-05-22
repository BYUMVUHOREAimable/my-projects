from django.core.management.base import BaseCommand
from data.utils import generate_sample_data, process_dataset, get_dataset_description
import json

class Command(BaseCommand):
    help = 'Generate sample research data'

    def handle(self, *args, **options):
        self.stdout.write('Generating 500,000 rows of data...')
        
        # Generate and process data
        df = generate_sample_data(500000)
        df = process_dataset(df)
        
        # Save to CSV
        df.to_csv('research_data.csv', index=False)
        
        # Save description
        description = get_dataset_description(df)
        with open('dataset_description.json', 'w') as f:
            json.dump(description, f, indent=2, default=str)
        
        self.stdout.write(self.style.SUCCESS('Successfully generated data!')) 