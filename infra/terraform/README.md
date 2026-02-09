Terraform module to provision an EC2 instance for the `cuppies` app.

Quick start
1. Copy example vars and edit:
   cp terraform.tfvars.example terraform.tfvars
   # edit terraform.tfvars and set `key_name` to the name of an existing AWS key pair

2. Initialize and apply:
   cd infra/terraform
   terraform init
   terraform plan -out plan.tfplan
   terraform apply "plan.tfplan"

3. Get the public IP of the instance:
   terraform output -raw public_ip

Notes
- The module expects an existing AWS key pair (set `key_name` in `terraform.tfvars`). It will not import or register a new key.
- No application, Docker, or other dependencies are installed by this Terraform configuration (user-data is not used).
- For production, add remote state (S3 + DynamoDB) and tighten the security group rules.

Example to use the instance with Ansible
1. Create inventory:
   terraform output -raw public_ip > ../ansible/inventory/hosts
   sed -i '1i[app]' ../ansible/inventory/hosts
2. Run Ansible (example):
   ansible-playbook -i ../ansible/inventory/hosts ../ansible/playbook.yml --private-key ~/.ssh/cuppies-key.pem -u ubuntu

Want me to add a remote backend (S3/DynamoDB) and a Jenkins pipeline stage? Ask and I'll add them.