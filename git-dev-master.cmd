@echo off

echo
echo Pushing development branch to GitHub
git push

echo
echo ========Checking out master=========
git checkout master
echo
echo =============Merging================
git merge development
echo
echo =============Pushing================
git push
echo
echo ========Deploying on Server=========
bash -c "ssh -t dh_chavarim@ps565483.dreamhost.com './deploy.sh'"

echo
echo ========Checking out development===
git checkout development
