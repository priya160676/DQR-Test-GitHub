#!/bin/bash
# Example rollback script to revert to the previous successful deployment

echo "Starting rollback..."

# Check if a previous deployment artifact exists
if [ -d "./previous_version_directory" ]; then
  echo "Previous deployment found. Restoring..."

  # Restore from previous version (could be a git checkout, artifact extraction, etc.)
  cp -r ./previous_version_directory/* ./deployment/ # Example, adjust based on your actual structure

  # Re-run the deployment or redeploy the previous version (if required)
  ./deploy.sh
else
  echo "No previous deployment found. Rollback aborted."
  exit 1
fi

echo "Rollback complete."
