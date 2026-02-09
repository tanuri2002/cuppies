output "instance_id" {
  description = "EC2 instance id"
  value       = aws_instance.cuppies.id
}

output "public_ip" {
  description = "Public IP of the instance"
  value       = aws_instance.cuppies.public_ip
}

output "public_dns" {
  description = "Public DNS name of the instance"
  value       = aws_instance.cuppies.public_dns
}
